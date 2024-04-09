import { Sequelize } from "sequelize";
import { Image } from '../../models/image';
import { TagType } from '../../models/tag_type';
import { Tag } from '../../models/tag';

//get images by id
//get tags by tag_type_id

export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD ?? "", {
    host: process.env.DATABASE_HOST ?? 'localhost',
    dialect: 'mysql'
});

Image.hasMany(Tag, { foreignKey: "image_id" });
Tag.belongsTo(Image, { foreignKey: "image_id" });

TagType.hasMany(Tag, { foreignKey: "tag_type_id" });
Tag.belongsTo(TagType, { foreignKey: "tag_type_id" });

export const insertImage = async (fileName: string, data: Buffer) => {
    const image = await Image.create({
        file_name: fileName,
        data
    })

    return image;
}

export const getImage = async (imageId) => {
    const image = await Image.findOne({
        where: {
            id: imageId
        }
    })

    return image;
}

export const getTagTypes = async () => {
    const tagTypes = await TagType.findAll();

    return tagTypes;
}

export const insertTag = async (imageId: number, tagTypeId: number) => {
    const tag = await Tag.create({
        image_id: imageId,
        tag_type_id: tagTypeId
    })

    return tag;
}

export const getImageIdsByTags = async (tagIds) => {
    if (tagIds[0] === '')
        return [];

    const tags = [];

    for (const tagId of tagIds) {
        const tagData = await Tag.findAll({
            where: {
                tag_type_id: tagId
            },
            include: Image
        })
        tags.push(...tagData);
    }

    const imageIds = [];

    tags.forEach(tag => {
        const imageId = tag.image.id;
        if (!imageIds.includes(imageId))
            imageIds.push(imageId);
    })

    return imageIds;
}