import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("employee",{schema:"hashtrader_exchange"})
export class employee {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"employeeId"
        })
    employeeId:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"firstName"
        })
    firstName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"lastName"
        })
    lastName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"email"
        })
    email:string;
        
}
