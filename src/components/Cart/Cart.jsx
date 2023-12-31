import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

import useStyles from './styles'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const isEmpty = !cart?.line_items?.length;
    const classes = useStyles();

    const EmptyCart = () => {
        return(
        <Typography variant="subtitle1">Kitna Gareeb hai bhai tu,
        <Link to="/" className={classes.link}> kuch khareed le yaha se</Link>!
        </Typography>
        )
    }

    const FilledCart = () => {
        return(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>

                ))};
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h6">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
        )
    };

    if(!cart.line_items) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
            { !cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart