const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "FinishedClass",
    tableName: "finished_class",
    columns: {
        finished_id: {
            primary: true,
            type: "int",
            generated: true
        },
        fk_cou_id: {
            type: "int",
            nullable: false
        },
        fk_cla_id: {
            type: "int",
            nullable: false
        },
        fk_use_id: {
            type: "int",
            nullable: false
        }
    }
})
