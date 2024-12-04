import Link from "next/link"

export function Image({product, type, setType}) {
    
    return (
        product.url &&
        <div className='product-image'>
            <div className="main-image" style={{backgroundImage: `url(${product.url[type]})`}}></div>
            {
                product.url.map((item, index) => (
                    index % 5 === 0 &&
                    <div className='small-images-group' key={index}>
                        {
                            product.url.slice(index, Math.min(index + 5, product.url.length)).map((nitem, nindex) => (
                                <img 
                                    src={nitem} 
                                    className={'small-image'+((Math.round(index + nindex) === type) ? ' is-chosen' : '')}
                                    key={nindex}
                                    onClick={() => {setType(Math.round(index + nindex))}}
                                />
                            ))
                        }
                    </div>
                ))
            }
            <div className="share-product">
                <div className="share-product-p">Chia sẻ:</div>
                <Link href='https://www.messenger.com/' className="share-product-icon" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJqt4miVVToJVh67Wfdt6aNfOrn0NPiEnaGw&s)'}}/>
                <Link href='https://www.facebook.com/' className="share-product-icon" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDwqFwavrxGE5zZlb9OO2lISjJ1Y2-ui-Lw&s)'}}/>
                <Link href='https://www.instagram.com/' className="share-product-icon" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5aXGNK01dOnoN6MZUto79OMobjwJzu5Gzw&s)'}}/>
                <Link href='https://x.com/' className="share-product-icon" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR83eGktDJ68A1eAe_uA0rBd69uFYTEncDG3g&s)'}}/>
            </div>
        </div>
    )
}