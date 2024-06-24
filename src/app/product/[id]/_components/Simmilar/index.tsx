import SimmilarProducts from '@/components/SimmilarProducts'
import { Product } from '@/types'
import React from 'react'

const Simmilar = ({product}: {product: Product}) => {
	return (
		<div className="simmilar-products__container">
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-dark-6">You may also like</h3>
          <SimmilarProducts
            category={product.category}
            nonRepeatId={product.id}
          />
        </div>
      </div>
	)
}

export default Simmilar
