import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {users} from "./users";


@Entity("people",{schema:"hashtrader_exchange"})
@Index("userId",["user",],{unique:true})
export class people {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"firstName"
        })
    firstName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"lastName"
        })
    lastName:string;
        

    @Column("date",{ 
        nullable:false,
        name:"birthday"
        })
    birthday:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"country"
        })
    country:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"state"
        })
    state:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"zip"
        })
    zip:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"streetAddress"
        })
    streetAddress:string;
        

   
    @OneToOne(type=>users, users=>users.people,{ onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'userId'})
    user:users | null;

}
