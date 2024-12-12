const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Source and destination directories
const parentDir = './types';
const sourceDir = './types/model';
const destDir = './types/processed';
const destDirEnums = './types/processed/enums';

const filePathReplacements = {
  CoinbasePublicRestApi: '',
  coinbasePublicRestApi: '',
  PrimeRESTAPI: '',
  primeRESTAPI: '',
  CoinbaseCustodyApi: '',
  coinbaseCustodyApi: '',
};

// Ensure the destination directory exists
if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir, { recursive: true });
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
} else {
  fs.rmSync(destDir, { recursive: true });
}

if (!fs.existsSync(destDirEnums)) {
  fs.mkdirSync(destDirEnums, { recursive: true });
}

// Function to replace specific strings
function replaceString(content, replacements) {
  let updatedContent = content;
  for (const [search, replace] of Object.entries(replacements)) {
    updatedContent = updatedContent.split(search).join(replace);
  }
  return updatedContent;
}

function cleanClasses(updatedContent) {
  updatedContent = updatedContent.replace(
    /export class (\w+) \{/g,
    (match, className) => {
      return `export type ${className} = {`;
    }
  );
  // Regular expression to match the function definition and body:
  // - Handles modifiers (async, public, private, etc.)
  // - Matches the function name and parameters
  // - Captures the entire function body, including the curly braces
  let functionName = 'attributeTypeMap';
  let regex = new RegExp(
    `\\s*(?:async|public|private|protected|static|\\s)*${functionName}\\s*(?:<.*?>)?\\s*\\(.*?\\)\\s*(?::\\s*[^=\\{]+)?\\s*\\{[\\s\\S]*?\\}|` + // Matches function definitions
      `\\s*static\\s+${functionName}\\s*:\\s*[^=]+=\\s*\\[[\\s\\S]*?\\];`,
    'g'
  );

  // Remove the function calls from the content
  updatedContent = updatedContent.replace(regex, '');

  functionName = 'getAttributeTypeMap';
  regex = new RegExp(
    `\\s*(?:async|public|private|protected|static|\\s)*${functionName}\\s*(?:<.*?>)?\\s*\\(.*?\\)\\s*(?::\\s*[^=\\{]+)?\\s*\\{[\\s\\S]*?\\}|` + // Matches function definitions
      `\\s*static\\s+${functionName}\\s*:\\s*[^=]+=\\s*\\[[\\s\\S]*?\\];`,
    'g'
  );

  // Remove the function calls from the content
  updatedContent = updatedContent.replace(regex, '');

  regex = /^\s*export\s+namespace\s+\w+\s*\{\s*\}/gm;

  // Remove lines containing namespace
  updatedContent = updatedContent.replace(regex, '');
  return updatedContent;
}

// Main function to process files
function processFiles() {
  // List all files in the source directory
  const files = fs.readdirSync(sourceDir);

  // Get Prettier configuration
  const prettierConfig = prettier.resolveConfig.sync('../.prettierrc') || {};

  const enumClasses = [];
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    if (fs.statSync(sourcePath).isFile()) {
      const content = fs.readFileSync(sourcePath, 'utf8');
      const isEnum = content.indexOf('enum') > 0;
      if (isEnum) {
        const filePath = replaceString(
          path.join(destDirEnums, file),
          filePathReplacements
        );
        const enumName = filePath
          .replace('types/processed/enums/', '')
          .replace('.ts', '');
        console.log(enumName);
        enumClasses.push(enumName);
      }
    }
  });

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    let destPath = path.join(destDir, file);

    // Read each file (synchronously or asynchronously)
    if (fs.statSync(sourcePath).isFile()) {
      if (sourcePath.indexOf('google') > -1) {
        console.log('skipping file');
        return;
      }

      const content = fs.readFileSync(sourcePath, 'utf8');
      const isEnum = content.indexOf('enum') > 0;

      // Replace specific strings
      const replacements = {
        '<any>': '',
        "\nimport { RequestFile } from './models';\n": '',

        'static discriminator: string | undefined = undefined;\n\n': '',
        CoinbasePublicRestApi: '',
        coinbasePublicRestApi: '',
        PrimeRESTAPI: '',
        primeRESTAPI: '',
        CoinbaseCustodyApi: '',
        coinbaseCustodyApi: '',
      };
      let updatedContent = replaceString(content, replacements);

      if (updatedContent.indexOf('class') > 0) {
        updatedContent = cleanClasses(updatedContent);
      }

      // Remove the generated multiline comment header
      let regex = /\/\*[\s\S]*?\*\//;
      updatedContent = updatedContent.replace(regex, '');

      // Regular expression to match specific import statements
      regex = /import\s+\{[^}]+\}\s+from\s+'\.\/(.*?)';/g;

      // Replace the import paths with the updated path
      updatedContent = updatedContent.replace(regex, (match, importPath) => {
        if (enumClasses.includes(importPath)) {
          return `import { ${match
            .split('{')[1]
            .split('}')[0]
            .trim()} } from './enums/${importPath}';`;
        } else {
          return `import { ${match
            .split('{')[1]
            .split('}')[0]
            .trim()} } from './${importPath}';`;
        }
      });

      if (isEnum) {
        destPath = replaceString(
          path.join(destDirEnums, file),
          filePathReplacements
        );
      } else {
        destPath = replaceString(destPath, filePathReplacements);
      }

      updatedContent = prettier.format(updatedContent, {
        ...prettierConfig,
        parser: 'typescript',
      });

      // Write the updated content to the destination directory
      fs.writeFileSync(destPath, updatedContent, 'utf8');
      console.log(`Processed: ${file}`);
    }
  });

  console.log('All files processed.');
}

// Execute the script
processFiles();