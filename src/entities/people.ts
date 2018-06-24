import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";


@Entity("people",{schema:"hashtrader_exchange"})
export class people {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"firstName"
        })
    firstName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"lastName"
        })
    lastName:string;
        

    @Column("date",{ 
        nullable:false,
        name:"birthday"
        })
    birthday:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"country"
        })
    country:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"state"
        })
    state:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"zip"
        })
    zip:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"streetAddress"
        })
    streetAddress:string;
        

    @Column("longblob",{ 
        nullable:true,
        name:"passportPhoto"
        })
    passportPhoto:Buffer | null;
        

    @Column("longblob",{ 
        nullable:true,
        name:"photoWithPassport"
        })
    photoWithPassport:Buffer | null;
        

    @Column("longblob",{ 
        nullable:true,
        name:"driversLicensePhoto"
        })
    driversLicensePhoto:Buffer | null;
        

   
    @OneToMany(type=>users, users=>users.person,{ onDelete: 'CASCADE' })
    userss:users[];
    
}
