const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const S3_BUCKET = process.env.S3_BUCKET
const S3_REGION = process.env.S3_REGION
const s3_bucket = `//${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/`

async function save(name, data) {
    console.log('*****lib.imageStoreS3')
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: `pizzas/${name}.png`,
            Body: Buffer.from(data, 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/png',
        }

        s3.putObject(params, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(`${s3_bucket}${params.Key}`)
            }
        })
    })    
}

module.exports = {
    save,
    s3_bucket
}
