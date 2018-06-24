import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {wallets} from "./wallets";
import {transactions} from "./transactions";


@Entity("deposits",{schema:"hashtrader_exchange"})
@Index("walletId",["wallet",])
@Index("transactionId",["transaction",])
export class deposits {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>wallets, wallets=>wallets.depositss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'walletId'})
    wallet:wallets | null;


   
    @ManyToOne(type=>transactions, transactions=>transactions.depositss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'transactionId'})
    transaction:transactions | null;

}
