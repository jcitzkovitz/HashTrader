import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {addresses} from "./addresses";
import {markets} from "./markets";
import {orders} from "./orders";
import {transactions} from "./transactions";


@Entity("coins",{schema:"hashtrader_exchange"})
@Index("ticker",["ticker",],{unique:true})
export class coins {

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
        length:5,
        name:"ticker"
        })
    ticker:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:20,
        name:"name"
        })
    name:string;
        

    @Column("tinyint",{ 
        nullable:true,
        width:1,
        default:"0",
        name:"stakeable"
        })
    stakeable:boolean | null;
        

    @Column("enum",{ 
        nullable:true,
        default:"OTHER",
        enum:["MAIN","OTHER"],
        name:"marketType"
        })
    marketType:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:64,
        name:"coinWebsite"
        })
    coinWebsite:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:64,
        name:"coinBlockExplore"
        })
    coinBlockExplore:string | null;
        

   
    @OneToMany(type=>addresses, addresses=>addresses.coin,{ onDelete: 'RESTRICT' })
    addressess:addresses[];
    

   
    @OneToMany(type=>markets, markets=>markets.coin,{ onDelete: 'RESTRICT' })
    marketss:markets[];
    

   
    @OneToMany(type=>markets, markets=>markets.coin2,{ onDelete: 'RESTRICT' })
    marketss2:markets[];
    

   
    @OneToMany(type=>orders, orders=>orders.sellCoin,{ onDelete: 'RESTRICT' })
    orderss:orders[];
    

   
    @OneToMany(type=>orders, orders=>orders.buyCoin,{ onDelete: 'RESTRICT' })
    orderss2:orders[];
    

   
    @OneToMany(type=>transactions, transactions=>transactions.coin,{ onDelete: 'RESTRICT' })
    transactionss:transactions[];
    
}
