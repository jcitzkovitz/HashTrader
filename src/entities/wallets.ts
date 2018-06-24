import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";
import {addresses} from "./addresses";
import {deposits} from "./deposits";


@Entity("wallets",{schema:"hashtrader_exchange"})
@Index("userId",["user",])
export class wallets {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"balance"
        })
    balance:number;
        

   
    @ManyToOne(type=>users, users=>users.walletss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'userId'})
    user:users | null;


   
    @OneToMany(type=>addresses, addresses=>addresses.wallet,{ onDelete: 'RESTRICT' })
    addressess:addresses[];
    

   
    @OneToMany(type=>deposits, deposits=>deposits.wallet,{ onDelete: 'RESTRICT' })
    depositss:deposits[];
    
}
