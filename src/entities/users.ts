import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {orders} from "./orders";
import {people} from "./people";
import {transactions} from "./transactions";
import {wallets} from "./wallets";


@Entity("users",{schema:"hashtrader_exchange"})
@Index("username",["username",],{unique:true})
export class users {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:50,
        name:"username"
        })
    username:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:256,
        name:"passwordHash"
        })
    passwordHash:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:256,
        name:"salt"
        })
    salt:string;
        

    @Column("enum",{ 
        nullable:false,
        enum:["ADMIN","EMPLOYEE","EXUSER"],
        name:"type"
        })
    type:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"phoneNumber"
        })
    phoneNumber:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:64,
        name:"googleAuth"
        })
    googleAuth:string | null;
        

    @Column("double",{ 
        nullable:true,
        default:"0",
        precision:22,
        name:"withdrawalLimit"
        })
    withdrawalLimit:number | null;
        

    @Column("tinyint",{ 
        nullable:true,
        width:1,
        default:"0",
        name:"passport"
        })
    passport:boolean | null;
        

    @Column("tinyint",{ 
        nullable:true,
        width:1,
        default:"0",
        name:"driversLicense"
        })
    driversLicense:boolean | null;
        

    @Column("tinyint",{ 
        nullable:true,
        width:1,
        default:"0",
        name:"photoWPassport"
        })
    photoWPassport:boolean | null;
        

   
    @OneToMany(type=>orders, orders=>orders.user,{ onDelete: 'RESTRICT' })
    orderss:orders[];
    

   
    @OneToOne(type=>people, people=>people.user,{ onDelete: 'CASCADE' })
    people:people | null;


   
    @OneToMany(type=>transactions, transactions=>transactions.user,{ onDelete: 'RESTRICT' })
    transactionss:transactions[];
    

   
    @OneToOne(type=>wallets, wallets=>wallets.user,{ onDelete: 'RESTRICT' })
    wallets:wallets | null;

}
