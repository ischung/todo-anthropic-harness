# 프로그램 실행 방법
  cd todo-demo/backend                                                                                                                       
                                                                                                                                             
  # 최초 1회: 가상환경 설정 및 패키지 설치                                                                                                   
  python -m venv venv
  source venv/bin/activate                                                                                                                   
  pip install -r requirements.txt                                                                                                          
                                                                                                                                             
  # 서버 실행                                                                                                                              
  uvicorn main:app --reload

  ▎ 실행 후 → http://localhost:8001                                                                                                       
   
  ---                                                                                                                                        
  프론트엔드 실행 (터미널 2)                                                                                                               
                                                                                                                                             
  cd todo-demo/frontend
                                                                                                                                             
  # 최초 1회: 패키지 설치                                                                                                                  
  npm install

  # 개발 서버 실행
  npm run dev

  ▎ 실행 후 → http://localhost:5173           
