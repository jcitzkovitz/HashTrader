import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {coins} from "./coins";
import {wallets} from "./wallets";


@Entity("addresses",{schema:"hashtrader_exchange"})
@Index("coinId",["coin",])
@Index("walletId",["wallet",])
export class addresses {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("binary",{ 
        nullable:false,
        length:64,
        name:"addressHash"
        })
    addressHash:Buffer;
        

    @Column("varchar",{ 
        nullable:false,
        length:256,
        name:"salt"
        })
    salt:string;
        

   
    @ManyToOne(type=>coins, coins=>coins.addressess,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'coinId'})
    coin:coins | null;


   
    @ManyToOne(type=>wallets, wallets=>wallets.addressess,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'walletId'})
    wallet:wallets | null;


    @Column("enum",{ 
        nullable:true,
        default:"REGULAR",
        enum:["REGULAR","STAKE"],
        name:"type"
        })
    type:string | null;
        
}
