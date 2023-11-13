import aws from 'aws-sdk';
import crypto from 'crypto';
import dotenv from 'dotenv'

dotenv.config();

const region = "eu-central-1"
const bucketName = "gute-nacht-geschichte-images"
const accessKeyId = process.env.ACCESS_KEY_S3
const secretAccessKey = process.env.SECRET_ACCESS_KEY_S3

console.log(accessKeyId, "accessKeyId")

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export default async function GenerateUploadUrl() {
    console.log("GenerateUploadUrllllll")
    const imageName = crypto.randomBytes(16).toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60 * 5
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    console.log(uploadUrl, "uploadUrl")
    return uploadUrl
}