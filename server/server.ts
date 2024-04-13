import express from "express";
import multer from 'multer';
import path from "path";
import { insertImage, getImage, getTagTypes, insertTag, getImageIdsByTags, insertTagType, deleteTagTypes } from "./queries/query";
import fs from 'fs';

export const startServer = () => {
    const app = express();

    const upload = multer({ dest: 'uploads/' })

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("dist-web"));

    app.get("/api/tagTypes", async (req, res) => {
        const tagTypes = await getTagTypes();
        res.send({ success: true, tagTypes });
    })

    app.post("/api/tagtype", async (req, res) => {
        const { tagName } = req.body;
        const newTag = await insertTagType(tagName);
        res.send({ success: true, newTag });
    })

    app.delete("/api/tagtype", async (req, res) => {
        const { tagTypes } = req.body;
        await deleteTagTypes(tagTypes);
        res.send({ success: true });
    })

    app.get("/api/images", async (req: any, res) => {
        const { tags } = req.query;
        const imageIds = await getImageIdsByTags(tags.split(","));
        res.send({ success: true, imageIds });
    })

    app.get("/api/image", async (req: any, res) => {
        const { imageId } = req.query;
        const image = await getImage(imageId);
        res.send(image.data);
    })

    const imageUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'tags', maxCount: 8 }])
    app.post("/api/image", imageUpload, async (req: any, res) => {
        if (req.files) {
            const image = req.files.image[0]
            const fileName = image.filename;
            const filePath = path.resolve(`./uploads/${fileName}`);

            fs.readFile(filePath, async (err, data) => {
                const newImage = await insertImage(image.originalname, data);

                console.log(req.body)
                const tags = [...req.body.tags];
                tags.forEach(tag => {
                    insertTag(newImage.id, tag);
                })
            })
        }

        res.send({ success: true });
    })

    app.listen(8080);
}