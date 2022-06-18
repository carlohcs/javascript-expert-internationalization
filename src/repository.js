import { writeFile, readFile } from "fs/promises"

export const save = async (data) => {
  // doesn't exists: __filename, __dirname
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta
  const { pathname: databaseFile } = new URL('database.json', import.meta.url);
  // console.log('databaseFile: ', databaseFile);
  const currentData = JSON.parse(await readFile(databaseFile))
  currentData.push(data)

  await writeFile(databaseFile, JSON.stringify(currentData))
}
