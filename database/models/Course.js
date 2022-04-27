const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Course",
    tableName: "course",
    columns: {
        cou_id: {
            primary: true,
            type: "int",
            generated: true
        },
        cou_name: {
            type: "varchar",
            nullable: false
        },
        cou_duration: {
            type: "varchar",
            nullable: false
        },
        cou_description: {
            type: "varchar",
            nullable: false
        },
        cou_video: {
            type: "varchar",
            nullable: true
        },
        cou_level: {
            type: "varchar",
            nullable: false
        }
    }
})
