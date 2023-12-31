import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from './Interview.module.css';
import SearchBarStyle from '../mainpage/Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { callInterview } from '../../apis/interviewAPICalls'
import { callInterviewAnswer } from '../../apis/interviewAPIanswerCall'
import { handleAction } from "redux-actions";


// 수정 사항
// 폰트 수정하기 

const Interview = () => {


    const [searchQuery, setSearchQuery] = useState('');
    const [question, setquestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [AIanswer, setAIanswer] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // 토글 키 상태 관리
    const [Toggled, setToggled] = useState(false);
    const toggle = () => {
        setToggled(!Toggled);
    };

    // 로딩 중을 표시해줌
    const handleSearchAnnouncement = () => {
        setIsLoading(true); // 로딩 시작
        dispatch(callInterview({ searchQuery: searchQuery }, (result) => {
            setquestion(result.question);
            setIsLoading(false); // 로딩 종료
        }));
    };

    const handleSendAnswer = async () => {
        setIsLoading(true); // 로딩 시작
        dispatch(callInterviewAnswer({ answer: answer }, (sandresult) => {
            setAIanswer(sandresult.AIanswer);
            setIsLoading(false); // 로딩 종료
        }));
    };

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };


    // 가져온 json 문자열을 한줄 씩 자른다.
    const Lines = question.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
    ));


    // 화면 작업은 return 내부에 작성한다.
    return (
        <>
            {/* 첫 화면에 나타날 내용 */}

            <div className={style.header}><h1>AI 면접</h1>
                <div className={style.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>
            </div>

            {/* 검색창을 중앙으로 오게 하는 div */}
            <div className={SearchBarStyle.searchWrapper}>
                <div className={SearchBarStyle.searchBar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyle.faMagnifyingGlass} style={{ cursor: 'pointer' }} />
                    <input type="search" className={SearchBarStyle.searchBox} autoComplete='off' placeholder="채용 공고 링크를 입력하세요"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                    </input>
                </div>
            </div>
            {/* 검색창 아래에 버튼의 위치를 고정 */}
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100px', background: 'white', borderRadius: '70px'
            }}>
                <button className={style.blueButton} onClick={handleSearchAnnouncement}>AI 면접 시작하기</button>
            </div>

            {/* 질문창과 답변 창을 중앙으로 정렬 */}
            <div className={style.questionBoxWrapper}>
                {/* 로딩 상태를 보여준다 */}
                {isLoading &&
                    <div className={style.lodingIndicator}>
                        <div className={style.spinner}></div>
                        <div className={style.load}>질문을 생성하고 있습니다</div>
                    </div>
                }

                {question && (
                    <div className={style.questionBox}>
                        {Lines}

                        {/* 토글 버튼 */}
                        <button onClick={handleToggle} className={style.toggle}>
                            {isToggled ? '▲' : '▼'}
                        </button>

                        {/* 토글된 상태에 따라 답변란 표시 */}
                        {isToggled && (
                            <div className={style.answerBoxs}>
                                <input type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    autoComplete='off' placeholder="여기에 답변을 입력해주세요."></input>
                                <button className={style.actionButton} onClick={handleSendAnswer}>답변 하기</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {AIanswer && (
                <div className={style.questionBox}>
                    {AIanswer && <p>AI 피드백: {AIanswer}</p>}
                </div>)}

        </>
    )
}

export default Interview;
