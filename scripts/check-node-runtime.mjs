const expectedNodeVersion = "24.15.0";
const actualNodeVersion = process.versions.node;

if (actualNodeVersion !== expectedNodeVersion) {
  console.error(
    `Expected Node.js ${expectedNodeVersion}, but found ${actualNodeVersion}. Run "nvm use" before local checks.`,
  );
  process.exit(1);
}

console.log(`Node.js runtime OK: ${actualNodeVersion}`);
