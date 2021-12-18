import React, { useState, useEffect } from 'react'
import { Button, Modal} from 'react-bootstrap'; 
function MyModal(props) {

  const [업종분류, set업종분류] = useState([ '카페/ 디저트','음식점/ 주점','편의점 /마트','생활/ 교육', '보건 /복지', '의류/잡화', '문화/체육', '자동차/주유', '가전/통신','가구/인테리어','부동산/임대','건축/철물','디자인/인쇄','여행/숙박','기업/기관','기타']);
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> 투 표 </h4>
            <form>  
              <fieldset class="row mb-3">
                  <legend class="col-form-label col-sm-2 pt-0">지역 선택</legend>
                  <div class="col-sm-10">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                        <label class="form-check-label" for="gridRadios1">
                        카페
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                        <label class="form-check-label" for="gridRadios2">
                        Second radio
                        </label>
                    </div>
                    <div class="form-check disabled">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                        <label class="form-check-label" for="gridRadios3">
                        기타
                        </label>
                    </div>  
                  </div>
              </fieldset>

              <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0">상세지역 선택</legend>
                    <div class="col-sm-10">
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                          <label class="form-check-label" for="gridRadios1">
                          카페
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                          <label class="form-check-label" for="gridRadios2">
                          Second radio
                          </label>
                      </div>
                      <div class="form-check disabled">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                          <label class="form-check-label" for="gridRadios3">
                          기타
                          </label>
                      </div>  
                    </div>
                </fieldset>

                <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0">업종 선택</legend>
                    <div class="col-sm-10">
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                          <label class="form-check-label" for="gridRadios1">
                          카페
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                          <label class="form-check-label" for="gridRadios2">
                          Second radio
                          </label>
                      </div>
                      <div class="form-check disabled">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                          <label class="form-check-label" for="gridRadios3">
                          기타
                          </label>
                      </div>  
                    </div>
                </fieldset>

                    <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">특정 상호명</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputEmail3" />
                            </div>
                        </div>
                    <div class="row mb-3">
                        <div class="col-sm-10 offset-sm-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck1" />
                            <label class="form-check-label" for="gridCheck1">
                            Example checkbox
                            </label>
                        </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                    </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default MyModal;