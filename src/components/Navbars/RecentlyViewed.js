import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media, } from 'reactstrap';
import { addToRecentlyViewed } from '../../redux/actions';
import { calculateDiscountedPrice, numberCommas } from 'components/commonUtils';
import { useNavigate } from 'react-router-dom';

const RecentlyViewedDropdown = ({ recentlyViewed, addToRecentlyViewed }) => {
    const navigate = useNavigate();

    const ellipsisStyle = () => ({
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '13px'
    }); 

    const detail = (detailId) => {
        // console.log("detailId", detailId);
        // console.log("product", product);
        
        navigate(`/admin/productdetail/${detailId}`)
    };

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
        <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
                {recentlyViewed.length > 0 ? (
                <img
                    alt="Product"
                    src={require(`../../assets/img/product/${recentlyViewed[recentlyViewed.length - 1].img}`)}
                />
                ) : (
                <i className="ni ni-ungroup"></i>
                )}
            </span>
            <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm" style={{color:"black"}}>
                    최근 본 상품
                </span>
            </Media>
        </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        {recentlyViewed.map((product) => (
          <DropdownItem key={product.detailId}>
            <div className="mt-0 border-top">
                <table className="table" style={{width:"100%"}}>
                    <tbody>
                        <tr onClick={() => detail(product.detailId)}>
                            <td>
                                <img
                                    alt="Product"
                                    src={require(`../../assets/img/product/${product.img}`)}
                                    style={{width:"65px", height:"90px"}}
                                />
                            </td>
                            <td>
                                <p>{product.brand}</p>
                                <p style={ellipsisStyle()}>{product.detailName}</p>
                                <span style={{ fontWeight:"bold" }}>{product.discountPer}%</span>
                                <span style={{ fontWeight:"bold", marginLeft: "10px" }}>{numberCommas(calculateDiscountedPrice(product.price, product.discountPer))}</span>
                                <span style={{ textDecoration: "line-through", color: "gray", marginLeft: "10px" }}>{numberCommas(product.price)}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const mapStateToProps = (state) => ({
  recentlyViewed: state.recentlyViewed,
});

const mapDispatchToProps = {
  addToRecentlyViewed,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedDropdown);
