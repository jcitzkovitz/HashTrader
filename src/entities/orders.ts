import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {coins} from "./coins";
import {markets} from "./markets";
import {users} from "./users";


@Entity("orders",{schema:"hashtrader_exchange"})
@Index("userId",["user",])
@Index("sellCoin",["sellCoin",])
@Index("buyCoin",["buyCoin",])
@Index("marketId",["market",])
export class orders {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"dateTime"
        })
    dateTime:Date;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"price"
        })
    price:number;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"amount"
        })
    amount:number;
        

    @Column("double",{ 
        nullable:false,
        precision:22,
        name:"total"
        })
    total:number;
        

    @Column("enum",{ 
        nullable:true,
        enum:["FILLED","NOT FILLED","CANCELLED"],
        name:"status"
        })
    status:string | null;
        

    @Column("enum",{ 
        nullable:true,
        enum:["BUY","SELL"],
        name:"type"
        })
    type:string | null;
        

   
    @ManyToOne(type=>coins, coins=>coins.orderss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'sellCoin'})
    sellCoin:coins | null;


   
    @ManyToOne(type=>coins, coins=>coins.orderss2,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'buyCoin'})
    buyCoin:coins | null;


   
    @ManyToOne(type=>markets, markets=>markets.orderss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'marketId'})
    market:markets | null;


   
    @ManyToOne(type=>users, users=>users.orderss,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'userId'})
    user:users | null;

}
