#!/usr/bin/env node
/* eslint-disable no-console */
const { spawn, exec } = require('child_process');

// eslint-disable-next-line no-unused-vars
const execute = (command, callback) => exec(command, (error, stdout, stderr) => callback(stdout));

const spawnPromise = (name, ...args) => new Promise((resolve, reject) => {
  const task = spawn(...args);
  task.stderr.on('data', (data) => {
    console.error(`${name}: ${data}`);
  });
  task.on('exit', (code) => {
    const message = `${name} exits with code ${code}`;
    console.log(message);
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(message));
    }
  });
});

function killPackager() {
  return new Promise((resolve, reject) => {
    execute('lsof -i :8081', (out) => {
      const promises = out
          .trim()
          .split('\n')
          .map(s => s.split(/\s+/))
          .slice(1)
          .map(row => row[1])
          .filter((value, index, self) => self.indexOf(value) === index)
          .map(pid => spawnPromise(`kill-packager-proc-${pid}`, 'kill', ['-9', pid]));
      Promise.all(promises).then(() => resolve()).catch(e => reject(e));
    });
  });
}

const watchman = () => spawnPromise('delete-watches', 'watchman', ['watch-del-all']);

const wipeTempDir = () => spawnPromise('wipe-temp-dir', 'rm', ['-rf', '$TMPDIR/react-*']);

const gradleClean = () => spawnPromise('gradle-clean', './gradlew', ['clean'], { cwd: './android' });

const xCodeClean = () => spawnPromise('xcode-clean', 'xcodebuild', ['clean'], { cwd: './ios' });

const wipeBuildDir = type => () => spawnPromise(`wipe-${type}-build-dir`, 'rm', ['-rf', 'build'], { cwd: `./${type}` });

// eslint-disable-next-line no-unused-vars
const npmCacheClean = () => spawnPromise('invalidate-npm-cache', 'npm', ['cache', 'clean']);

// eslint-disable-next-line no-unused-vars
const deleteNodeModules = () => spawnPromise('delete-node-modules', 'rm', ['-rf', 'node_modules']);

// eslint-disable-next-line no-unused-vars
const npmInstall = () => spawnPromise('npm-install', 'npm', ['install']);

const errors = [];

async function runInSequence(thunks) {
  for (let i = 0; i < thunks.length; i += 1) {
    if (errors.length > 0) {
      break;
    }
    try {
      // eslint-disable-next-line no-await-in-loop
      await thunks[i]();
    } catch (e) {
      errors.push(e);
    }
  }
}

// eslint-disable-next-line no-unused-vars
async function runInParallel(thunks) {
  await Promise.all(
      thunks.map(
          thunk => thunk().catch((e) => {
            errors.push(e);
          })
      )
  );
}

const queues = [
  [wipeTempDir],
  [watchman, killPackager],
  [wipeBuildDir('android'), gradleClean],
  [wipeBuildDir('ios'), xCodeClean],
  // [runInParallel([npmCacheClean, deleteNodeModules]), npmInstall]
];

Promise.all(queues.map(runInSequence));
