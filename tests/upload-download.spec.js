const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText,replaceText,change,filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const workSheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(workSheet,searchText);
    if(output.row === -1 && output.column === -1) {
        console.log("Search text not found");
        return;
    }
    const cell = workSheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(workSheet,searchText){
    let output = {row:-1,column:-1};
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    //console.log(output);
    return output;
}

//change price to 350
//writeExcelTest("Mango","350",{rowChange:0,colChange:2},"sample.xlsx");
test('Upload and Download Excel Validation', async ({page}) => {
    //Remember to delete files in the folder before running the test
    const textSearch = "Mango";
    const updateValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button",{name:"Download"}).click();
    const download = await downloadPromise; //wait till download is complete
    await download.saveAs("./downloads/download.xlsx");
    await writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"./downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("./downloads/download.xlsx"); //Element should have type=file  

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole("row").filter({ has: textLocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    //await download.delete();
})
