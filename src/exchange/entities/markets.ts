import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {coins} from "./coins";
import {orders} from "./orders";


@Entity("markets",{schema:"hashtrader_exchange"})
@Index("ticker",["ticker",],{unique:true})
@Index("coin1Id",["coin",])
@Index("coin2Id",["coin2",])
export class markets {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:10,
        name:"ticker"
        })
    ticker:string | null;
        

   
    @ManyToOne(type=>coins, coins=>coins.marketss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'coin1Id'})
    coin:coins | null;


   
    @ManyToOne(type=>coins, coins=>coins.marketss2,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'coin2Id'})
    coin2:coins | null;


   
    @OneToMany(type=>orders, orders=>orders.market,{ onDelete: 'RESTRICT' })
    orderss:orders[];
    
}
