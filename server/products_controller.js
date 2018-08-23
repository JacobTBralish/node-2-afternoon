module.exports ={
     create: (req, res) => {
        const db= req.app.get('db');
        let { name, description, price, imageUrl } = req.body;


        db.create_product([ name, description, price, imageUrl ])
        .then( () => {
            res.status(200)}).catch( error => {
                res.status(500).json({ errormessage: 'Unable to create your product.' });
                console.log(error);
            });

    },
    
    getAll: (req, res) => {
        const db = req.app.get('db');

        db.read_products()
        .then( products => {
            res.status(200).json(products)}).catch( error => {
                res.status(500).json({ errormessage: 'Unable to find your products.' });
                console.log(error);
            });
    },

    getOne: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params;

        db.read_product( id )
        .then ( product=> {
            res.status(200).json(product).catch( error => {
                res.status(500).json( { errormessage: 'Unable to find your product.' } );
                console.log(error);
            });
        });
    },
/* can also deconstruct let { body, params } = req and utilize id and desc that way */
update: ( req, res ) => {
    const db = req.app.get('db');
    const { params, query } = req;

    db.update_product([ params.id, query.desc ])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send( {errorMessage: 'Unable to update the prodcut.'} );
        console.log( err )
      } );
  },

  delete: ( req, res) => {
    const db = req.app.get('db');
    const { params } = req;

    db.delete_product([ params.id ])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send( {errorMessage: 'Unable to delete the product.'} );
        console.log( err )
      } );
  }
};