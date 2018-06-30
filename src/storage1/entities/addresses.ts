import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("addresses",{schema:"hashtrader_storage1"})
export class addresses {

    @Column("binary",{ 
        nullable:false,
        length:16,
        primary:true,
        name:"id"
        })
    id:Buffer;
        

    @Column("varchar",{ 
        nullable:false,
        length:256,
        name:"addressHash"
        })
    addressHash:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:256,
        name:"salt"
        })
    salt:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:5,
        name:"coinTicker"
        })
    coinTicker:string;
        
}
