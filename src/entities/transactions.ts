import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";
import {deposits} from "./deposits";
import {withdrawal} from "./withdrawal";


@Entity("transactions",{schema:"hashtrader_exchange"})
@Index("userId",["user",])
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
        

   
    @ManyToOne(type=>users, users=>users.transactionss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'userId'})
    user:users | null;


    @Column("enum",{ 
        nullable:false,
        enum:["DEPOSIT","WITHDRAWAL"],
        name:"type"
        })
    type:string;
        

   
    @OneToMany(type=>deposits, deposits=>deposits.transaction,{ onDelete: 'RESTRICT' })
    depositss:deposits[];
    

   
    @OneToMany(type=>withdrawal, withdrawal=>withdrawal.transaction,{ onDelete: 'RESTRICT' })
    withdrawals:withdrawal[];
    
}
