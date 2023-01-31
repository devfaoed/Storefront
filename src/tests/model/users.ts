import { User, usersStore } from '../../models/users.model';


const store = new usersStore();

describe('testing users.model file',()=>{

    it('tests create method exists', async ()=>{
        expect(store.create).toBeDefined();
    })

    it('should create a user', async ()=>{
        const result = await store.create({
            firstName: 'mary',
            lastName: 'poppins',
            email: 'marypoppins@usps.com',
            password: 'supercalifragilisticexpialidocious'
        });
        expect(result).toEqual({
            id: result.id,
            firstName: 'mary',
            lastName: 'poppins',
            email: 'marypoppins@usps.com',
            password: 'supercalifragilisticexpialidocious'
        })
    });

    it('tests show method exists', async ()=>{
        expect(store.show).toBeDefined();
    }) 

    it('should retrive a user by id',async () => {
        const secondUser = await store.create({
            firstName: 'hakuna',
            lastName: 'matata',
            email: 'timon@disney.com',
            password: 'noworriesfortherestoftheday'
        });
        const result = await store.show(secondUser.id as unknown as string); 

        expect(result).toEqual({
            id: secondUser.id,
            firstName: 'hakuna',
            lastName: 'matata',
            email: 'timon@disney.com',
            password: 'noworriesfortherestoftheday'
        })
    })

    it('tests index method exists', async ()=>{
        expect(store.index).toBeDefined();
    })

    it('should return all users', async ()=>{
        const result = await store.index();

        expect(result).toHaveSize;
    })

})

