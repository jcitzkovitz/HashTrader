import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";
import {addresses} from "./addresses";


@Entity("wallets",{schema:"hashtrader_exchange"})
@Index("userId",["user",],{unique:true})
export class wallets {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;


    @OneToOne(type=>users, users=>users.wallets,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'userId'})
    user:users | null;


   
    @OneToMany(type=>addresses, addresses=>addresses.wallet,{ onDelete: 'RESTRICT' })
    addressess:addresses[];
    
}
