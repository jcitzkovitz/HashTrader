import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {transactions} from "./transactions";


@Entity("withdrawal",{schema:"hashtrader_exchange"})
@Index("transactionId",["transaction",])
export class withdrawal {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"sendToAddress"
        })
    sendToAddress:string;
        

   
    @ManyToOne(type=>transactions, transactions=>transactions.withdrawals,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'transactionId'})
    transaction:transactions | null;

}
