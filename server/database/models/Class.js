const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Class",
    tableName: "class",
    columns: {
        cla_id: {
            primary: true,
            type: "int",
            generated: true
        },
        cla_name: {
            type: "varchar",
            nullable: false
        },
        cla_duration: {
            type: "varchar",
            nullable: false
        },
        cla_description: {
            type: "varchar",
            nullable: false
        },
        cla_video: {
            type: "varchar",
            nullable: false
        },
        fk_cou_id: {
            type: "int",
            nullable: false
        }
    }
})
