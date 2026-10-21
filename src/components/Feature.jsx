import React from 'react';
import Card from '@/components/Card'
import { getProducts } from '@/lib/products';

const FeatureProducts = () => {
    // Use the same id scheme as /products/[id] (slugified) so the
    // "View Details" link on each card opens that product's page.
    const topFeaturedProducts = getProducts().slice(0, 4);

    return (
        <div className='container mx-auto bg-slate-100 p-10'>
            <div className =' text-3xl font-bold text-center m-10'>Top Featured Products</div>
              <div className='grid  md:grid-cols-2  lg:grid-cols-4'>
                {topFeaturedProducts.map ((featureProducts, ind) => {
                return <Card products = {featureProducts} key = {ind}/>
              })}

                </div>

        </div>
    );
};

export default FeatureProducts;
