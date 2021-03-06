import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";
import {coins} from "./coins";


@Entity("transactions",{schema:"hashtrader_exchange"})
@Index("userId",["user",])
@Index("coinId",["coin",])
export class transactions {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:64,
        name:"txid"
        })
    txid:string | null;
        

    @Column("enum",{ 
        nullable:true,
        enum:["PENDING","CONFIRMED","FAILED"],
        name:"status"
        })
    status:string | null;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"amount"
        })
    amount:number;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"fee"
        })
    fee:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"dateTime"
        })
    dateTime:Date;
        

   
    @ManyToOne(type=>users, users=>users.transactionss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'userId'})
    user:users | null;


   
    @ManyToOne(type=>coins, coins=>coins.transactionss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'coinId'})
    coin:coins | null;


    @Column("enum",{ 
        nullable:false,
        enum:["DEPOSIT","WITHDRAWAL"],
        name:"type"
        })
    type:string;
        
}
