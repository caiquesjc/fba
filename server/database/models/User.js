const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        use_id: {
            primary: true,
            type: "int",
            generated: true
        },
        use_name: {
            type: "varchar",
            nullable: false
        },
        use_email: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        use_telephone: {
            type: "varchar",
            nullable: false
        },
        use_password: {
            type: "varchar",
            nullable: false
        },
        use_photo: {
            type: "varchar",
            nullable: true
        },
        use_age: {
            type: "int",
            nullable: false
        },
        use_nickname: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        use_is_admin: {
            type: "boolean",
            nullable: false,
            default: false
        }
    }
    // },
    // relations: {
    //     FinishedClass: {
    //         tyep: "one-to-many",
    //         target: "finished_class",
    //         joinColumn: {
    //             name: "fk_use_id",
    //             referencedColumnName: "use_id"
    //         }
    //     }
    // }
})