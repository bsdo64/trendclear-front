var React = require('react');

require('./index.scss');
var CategoryNav = React.createClass({
  displayName: 'CategoryNav',
  render() {
    return (
      <div>
        <div className="category_button" onClick={() => { this.refs.category_box.style.display = 'block'; }}>
          <i className="fa fa-bars"></i>
          <i className="fa fa-caret-right" aria-hidden="true"></i>
          <div className="category_text">카테고리</div>
        </div>

        { /* 카테고리 박스 */ }
        <div ref="category_box" className="category_box" onMouseLeave={(e) => { this.refs.category_box.style.display = 'none'; }}>
          <div className="gnb_menu" >
            <ul>
              <li className="gnbm">
                <a href="#gnb_cate_layer1">
                  <i className="fa fa-hashtag"></i>
                  <span>브랜드패션</span>
                </a>
                <div className="gnb_inner_wrap">
                  <div className="gnb_inner" >
                    <div className="grouping">
                      <div><h3 >브랜드패션</h3>
                        <ul className="category_lists">
                          <li><a href="http://www.11st.co.kr/html/category/127680.html">브랜드
                            여성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/252019.html">브랜드
                            남성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127634.html">브랜드
                            캐주얼의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/727029.html">브랜드
                            신발/가방</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127663.html">브랜드
                            시계/쥬얼리</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127646.html">수입명품</a>
                          </li>
                        </ul>
                      </div>
                      <div><h3 >브랜드패션</h3>
                        <ul className="category_lists">
                          <li><a href="http://www.11st.co.kr/html/category/127680.html">브랜드
                            여성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/252019.html">브랜드
                            남성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127634.html">브랜드
                            캐주얼의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/727029.html">브랜드
                            신발/가방</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127663.html">브랜드
                            시계/쥬얼리</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127646.html">수입명품</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grouping">
                      <div className="special"><h3 >브랜드패션</h3>
                        <ul className="category_lists" >
                          <li><a
                            href="http://www.11st.co.kr/browsing/Bsshop.tmall?method=getBsshop&amp;bsshopId=half">하프클럽</a>
                          </li>
                          <li><a
                            href="http://www.11st.co.kr/disp/DTAction.tmall?ID=DLUXURY11&amp;ctgrNo=47031">럭셔리11</a>
                          </li>
                          <li><a
                            href="http://global.11st.co.kr/html/global/globalMain.html">해외직구</a>
                          </li>
                          <li><a href="http://www.11st.co.kr/html/FashionDept.html">패션백화점</a></li>
                          <li><a href="http://shop.11st.co.kr/mandarinaduck-official">만다리나덕</a>
                          </li>
                          <li><a href="http://shop.11st.co.kr/tandy2015">TANDY</a></li>
                          <li><a href="http://shop.11st.co.kr/lapkorea">LAP</a></li>
                          <li><a href="http://shop.11st.co.kr/parkadmin">파크랜드</a></li>
                          <li><a href="http://shop.11st.co.kr/giordano264">지오다노</a></li>
                          <li><a href="http://shop.11st.co.kr/elandesi">미쏘</a></li>
                          <li><a href="http://shop.11st.co.kr/stco2010">by STCO</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="banner">
                      <div className="ban02">
                        <a href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&amp;planDisplayNumber=914513">
                          <img src="http://www.aut.ac.nz/__data/assets/image/0009/367794/Poster-Converted.jpg" alt="브라운브레스" />
                        </a>
                      </div>
                    </div>
                    <button type="button" className="btn_close">카테고리레이어 닫기</button>
                  </div>
                </div>
              </li>
              <li className="gnbm">
                <a href="#gnb_cate_layer1">
                  <i className="fa fa-hashtag"></i>
                  <span>브랜드패션</span>
                </a>
                <div className="gnb_inner_wrap">
                  <div className="gnb_inner" >
                    <div className="grouping">
                      <div><h3 >브랜드패션</h3>
                        <ul className="category_lists">
                          <li><a href="http://www.11st.co.kr/html/category/127680.html">브랜드
                            여성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/252019.html">브랜드
                            남성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127634.html">브랜드
                            캐주얼의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/727029.html">브랜드
                            신발/가방</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127663.html">브랜드
                            시계/쥬얼리</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127646.html">수입명품</a>
                          </li>
                        </ul>
                      </div>
                      <div><h3 >브랜드패션</h3>
                        <ul className="category_lists">
                          <li><a href="http://www.11st.co.kr/html/category/127680.html">브랜드
                            여성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/252019.html">브랜드
                            남성의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127634.html">브랜드
                            캐주얼의류</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/727029.html">브랜드
                            신발/가방</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127663.html">브랜드
                            시계/쥬얼리</a></li>
                          <li><a href="http://www.11st.co.kr/html/category/127646.html">수입명품</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grouping">
                      <div className="special"><h3 >브랜드패션</h3>
                        <ul className="category_lists" >
                          <li><a
                            href="http://www.11st.co.kr/browsing/Bsshop.tmall?method=getBsshop&amp;bsshopId=half">하프클럽</a>
                          </li>
                          <li><a
                            href="http://www.11st.co.kr/disp/DTAction.tmall?ID=DLUXURY11&amp;ctgrNo=47031">럭셔리11</a>
                          </li>
                          <li><a
                            href="http://global.11st.co.kr/html/global/globalMain.html">해외직구</a>
                          </li>
                          <li><a href="http://www.11st.co.kr/html/FashionDept.html">패션백화점</a></li>
                          <li><a href="http://shop.11st.co.kr/mandarinaduck-official">만다리나덕</a>
                          </li>
                          <li><a href="http://shop.11st.co.kr/tandy2015">TANDY</a></li>
                          <li><a href="http://shop.11st.co.kr/lapkorea">LAP</a></li>
                          <li><a href="http://shop.11st.co.kr/parkadmin">파크랜드</a></li>
                          <li><a href="http://shop.11st.co.kr/giordano264">지오다노</a></li>
                          <li><a href="http://shop.11st.co.kr/elandesi">미쏘</a></li>
                          <li><a href="http://shop.11st.co.kr/stco2010">by STCO</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="banner">
                      <div className="ban02">
                        <a href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&amp;planDisplayNumber=914513">
                          <img src="http://www.aut.ac.nz/__data/assets/image/0009/367794/Poster-Converted.jpg" alt="브라운브레스" />
                        </a>
                      </div>
                    </div>
                    <button type="button" className="btn_close">카테고리레이어 닫기</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = CategoryNav;