import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: false, unique: true})
    uuid!: string;

    @Column({nullable: false, unique: true})
    email!: string;

    @Column({nullable: false})
    password!: string;

    @Column({nullable: false})
    fname!: string;

    @Column({nullable: false})
    lname!: string;
}

export default UserEntity;
