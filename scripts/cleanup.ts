import {writeFileSync, readFileSync, unlinkSync} from 'fs';
import {modify, applyEdits} from 'jsonc-parser';

const updatePackageJson = (newProjectName: string) => {
    const packageJson = readFileSync('package.json', 'utf8');
    const edits = modify(packageJson, ['name'], newProjectName, {});
    edits.push(...modify(packageJson, ['scripts', 'cleanup'], undefined, {}));
    writeFileSync('package.json', applyEdits(packageJson, edits));
};

const overwriteReadme = (newProjectName: string) => {
    const newReadmeContent = `# ${newProjectName}

Hello world!`;
    writeFileSync('README.md', newReadmeContent, 'utf8');
};

const removeAction = () => {
    unlinkSync('.github/workflows/cleanup.yml');
    unlinkSync('scripts/cleanup.ts');
}

const main = () => {
    const newProjectName = process.argv[2];
    if (!newProjectName) {
        console.error('Please provide a project name as the first argument.');
        process.exit(1);
    }

    updatePackageJson(newProjectName);
    overwriteReadme(newProjectName);
    removeAction();
};

main();
