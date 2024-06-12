// Librerias
const fs = require('fs');
const excel = require('exceljs');
const path = require('path');
const request = require('request-promise');

// Variables Globales
const IMGUR_CLIENT_ID = 'client-id'; //indica tu client id 
const folderPath = './img';
const jsonData = require('./data.json');



// Funcion para subir una imagen a Imgur
async function uploadImageImgur(imagePath){
    const options = {
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        formData: {
            image: fs.createReadStream(imagePath)
        }
    }

    try{
        const response = await request(options);
        const jsonResponse = JSON.parse(response);
        console.log("Img Subida")
        return jsonResponse.data.link
        
    } catch(e){
        console.error("Error uploading image to imgur" + e)
        return null;
    }
}


// Funcion para leer los archivos de una carpeta
function readImages(folderPath){
    return new Promise((resolve, reject)=>{
        fs.readdir(folderPath, (error, files) =>{
            if(error){
                reject(error);
            }else{
                resolve(files);
            }
        })
    })
}

// Funcion principal
async function main() {
    try{
        const images = await readImages(folderPath);
        const excelWorkbook = new excel.Workbook();
        const worksheet = excelWorkbook.addWorksheet('Imagenes Subidas');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 30},
            { header: 'URL', key:'url', width: 60},
            { header: 'Estado', key:'estado', width: 60}
        ]
        for (const data of jsonData) {
            for (const img of images) {
                if (data.nombre === img) {
                    const imagePath = path.join(folderPath, img);
                    const imageUrl = await uploadImageImgur(imagePath);
                    if (imageUrl) {
                        worksheet.addRow({ nombre: img, url: imageUrl, estado: 'Subida' });
                    } else {
                        worksheet.addRow({ nombre: img, url: 'ERROR', estado: 'ERROR' });
                    }
                }
            }
        }
        const excelFilePath = 'imagenes.xlsx';
        await excelWorkbook.xlsx.writeFile(excelFilePath);
        console.log(`Archivo Excel generado: ${excelFilePath}`);
    } catch (e) {
        console.error('Error:', e);
    }

}

// Ejecutar la funcion principal
main();
