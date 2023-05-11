import infograph from '../imgs/info_graph.png';
import post1 from '../examples/1/post.json';
import post2 from '../examples/2/post.json';
import post3 from '../examples/3/post.json';
import post_res1 from '../examples/1/results_clean.json';
import post_res2 from '../examples/2/results_clean.json';
import post_res3 from '../examples/3/results_clean.json';

import work from "../imgs/work.svg";

import { useState } from 'react';

import useMediaQuery from '../components/MediaQuer';

const ServiceInfoPage = () => {
    const notMobile = useMediaQuery("(min-width: 1100px)");
    const [i, setI] = useState(0);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const demonstratonStart = () => {
        const a = document.querySelector('.main_column');
        a.classList.add('main_column_height_1');
        const b = document.querySelector('#section1');
        sleep(1200).then(() => {
            b.classList.remove("display_none");
            b.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            b.classList.remove("opacity0_animation");
            b.classList.add("opacity1_animation");
        }) 
    }
    var text_counter = i;
	const nextText = () => {
		const a = [document.querySelector('#demonstration_text_1'),
		document.querySelector('#demonstration_text_2'),
		document.querySelector('#demonstration_text_3')];
		const b = document.querySelector('#demonstration_text_slider_pos');
		a[text_counter].classList.add('text_example_no_active')
		b.classList.remove('demonstration_text_slider_block_position_' + (text_counter+ 1))
		text_counter += 1;
		if (text_counter > 2) {
			text_counter = 0;
		}
		a[text_counter].classList.remove('text_example_no_active');
		b.classList.add('demonstration_text_slider_block_position_' + (text_counter + 1))
	}
    const completeSection1 = async () => {
        setI(text_counter);
        setBtn(true);
        const b = document.querySelector('.main_column');
        b.classList.remove('main_column_height_1_back');
        b.classList.remove('main_column_height_1');
        b.classList.add('main_column_height_2');
        const c = document.querySelector('#section2');
        sleep(1200).then(() => {
            c.classList.remove("display_none");
            c.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            c.classList.remove("opacity0_animation");
            c.classList.add("opacity1_animation");
        })
        await sleep(2400);
        test();
    }
    const [btn1, setBtn] = useState(false);
    const [btn2, setBtn2] = useState(true);
    async function test(ii) {
        const posts = [post1, post2, post3];
        const text_add = ['}\n', 'id', ': your-token\n', 'name_of_event', ': '+posts[text_counter].name_of_event+'\n', 'event_description', ': '+posts[text_counter].event_description+"\n", '}'];
        const add_blocks = []
        for (var k = 1; k <= 8; k++) {
            add_blocks.push(document.querySelector('#add'+k))
        }
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        
        async function AddTextIn_1_Block(block, block_text) {
            var text_iter = 0;
            const text_size = block_text.length;
            var l = 20;
            if (text_size > 150) {
                l = 11;
            }
            l = 1
            async function AddTextIn_1_BlockLoop() {
                if (text_iter < text_size) {
                    // await sleep(l).then(() => {
                        block.innerHTML += block_text[text_iter];
                        text_iter += 1;
                        await sleep(l);
                        await AddTextIn_1_BlockLoop();
                        
                    // })                   
                }
            }
            
            await AddTextIn_1_BlockLoop();
        }
        
        async function AddTextIn_More_Blocks(blocks, blocks_text) {
            var block_iter = 0;
            const block_size = blocks.length;

            async function AddTextIn_More_BlocksLoop() {
                if (block_iter < block_size)  {
                    await AddTextIn_1_Block(blocks[block_iter], blocks_text[block_iter])
                        block_iter += 1;
                    await  AddTextIn_More_BlocksLoop(); 
                                            
                }
            }
            await AddTextIn_More_BlocksLoop();
        }
        const cursor = document.querySelector('.cursor_text');
        cursor.classList.remove('display_none');
        AddTextIn_More_Blocks(add_blocks, text_add).then(() => setBtn2(false));
    }
    const repeatTest = () => {
        for (var k = 1; k <= 8; k++) {
            document.querySelector('#add'+k).innerHTML = '';
        }
        setBtn2(true);
        test();
    }
    const completeSection2 = () => {
        setBtn2(true);
        const b = document.querySelector('.main_column');
        b.classList.remove('main_column_height_2');
        b.classList.add('main_column_height_3');
        const c = document.querySelector('#section3');
        sleep(1200).then(() => {
            c.classList.remove("display_none");
            c.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            c.classList.remove("opacity0_animation");
            c.classList.add("opacity1_animation");
            rsult_block();
        })
    }

    function rsult_block() {
        const result = [post_res1, post_res2, post_res3][i]
        const texta = Object.keys(result.skills);
        const blocks = texta.map((e, pos) => {
            return( 
            <div className='demonstration_res_block uk-card uk-card-default uk-card-body' key={pos}>
                <p className="demonstration_res_block_skill">{e}</p>
                <div className='demonstration_res_diagram'>
                    <div className='demonstration_res_skill_names'>
                        <span className='demonstration_res_skill_names_know'>Знать</span>   
                        <span className='demonstration_res_skill_names_can'>Уметь</span>
                        <span className='demonstration_res_skill_names_master'>Владеть</span>
                    </div>
                    <div className='demonstration_res_skill_percents'>
                        <div className='demonstration_res_know demonstration_res_line' style={{height: result.skills[e].know * 100 + '%'}}/>
                        <div className='demonstration_res_can demonstration_res_line' style={{height: result.skills[e].can * 100 + '%'}}/>
                        <div className='demonstration_res_master demonstration_res_line' style={{height: result.skills[e].master * 100 + '%'}}/>
                        <div className="demonstration_res_skill_percents_num">
                            <span>{Math.trunc(result.skills[e].know * 100)}</span>
                            <span>{Math.trunc(result.skills[e].can * 100)}</span>
                            <span>{Math.trunc(result.skills[e].master * 100)}</span>
                        </div>
                    </div>    
                </div>
            </div>)
        })
    
        return(
            <>
            {blocks}
            </>
        )
    }
    const repeatDemonstration = () => {
        const hidesection = [document.querySelector('#section2'), document.querySelector('#section3')]
        for (let u = 0; u < 2; u++) {
            hidesection[u].classList.remove('opacity1_animation');
            hidesection[u].classList.add('opacity0_animation');
        }
        document.querySelector('#section1').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
        
        sleep(500).then(() => {
            hidesection[0].classList.add('display_none');
            hidesection[1].classList.add('display_none');
            const b = document.querySelector('.main_column');
            b.classList.remove('main_column_height_3');
            b.classList.add('main_column_height_1_back');
            setBtn(false);
            for (var k = 1; k <= 8; k++) {
                document.querySelector('#add'+k).innerHTML = '';
            }
        })
        
    }
    const closeDemonstration = () => {
        const hidesection = [document.querySelector('#section1'), document.querySelector('#section2'), document.querySelector('#section3')]
        for (let u = 0; u < 3; u++) {
            hidesection[u].classList.remove('opacity1_animation');
            hidesection[u].classList.add('opacity0_animation');
        }
        document.querySelector('.demonstration_title').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
        
        sleep(500).then(() => {
            hidesection[0].classList.add('display_none');
            hidesection[1].classList.add('display_none');
            hidesection[2].classList.add('display_none');
            const b = document.querySelector('.main_column');
            b.classList.remove('main_column_height_3');
            b.classList.add('main_column_height_0_back');
            setBtn(false);
            for (var k = 1; k <= 8; k++) {
                document.querySelector('#add'+k).innerHTML = '';
            }
        })
        
    }
	return (
		<main>
			<div className="uk-container uk-container-large">
                <div className='main_column_description'>

                </div>
                <div className="infopage_zyv_block">
                    <div className='infopage_zyv_text'>
                        <div className='infopage_zyv_description'>Собирайте свое цифровое портфолио и открывайте новые возможности для обучения и работы!</div>
                    </div>
                    {/* {notMobile? (<img src={work} className="img_work" alt="work.svg"/>) : null} */}
                    
                </div>
                
				<div className='main_column'>
                    <div className='main_column_demonstration'>
                        <h1 className='demonstration_title'>Как это работает?</h1>
                        <button className='uk-button uk-button-default confirm-button demonstration_btn' onClick={demonstratonStart}>Попробовать</button>
                    </div>
					<section id="section1" className='demonstration_stage_up display_none'>
						<label htmlFor="demonstration" className='demonstration_stage_text'>ШАГ 1. ВЫБИРИТЕ ТЕКСТ ДЛЯ ОБРАБОТКИ</label>
						<div id="demonstration" className='demonstration_text_slider'>
							<div className='demonstration_text_slider_helper'>
								<div id="demonstration_text_slider_pos" className='demonstration_text_slider_block demonstration_text_slider_block_position_1'>
									<div id='demonstration_text_1' className='uk-card uk-card-default uk-card-body demonstration_text_card'>
										<div className="demonstration_text_block_head">
											<h2>{post1.name_of_event}</h2>
										</div>
										<p className='demonstration_text text_align_justify'>{post1.event_description}</p>
									</div>
									<div id='demonstration_text_2' className='uk-card uk-card-default uk-card-body demonstration_text_card text_example_no_active'>
										<div className="demonstration_text_block_head">
											<h2>{post2.name_of_event}</h2>
										</div>
										<p className='demonstration_text text_align_justify'>{post2.event_description}</p>
									</div>
									<div id='demonstration_text_3' className='uk-card uk-card-default uk-card-body demonstration_text_card text_example_no_active'>
										<div className="demonstration_text_block_head">
											<h2>{post3.name_of_event}</h2>
										</div>
										<p className='demonstration_text text_align_justify'>{post3.event_description}</p>
									</div>
								</div>
							</div>
						</div>
                        <div className='demonstration_btn_block'>
                            <button disabled={btn1} className='uk-button uk-button-default confirm-button demonstration_btn' onClick={nextText}>Другой</button>
                            <button disabled={btn1} className='uk-button uk-button-default confirm-button demonstration_btn' onClick={completeSection1}>Продолжить</button>
                        </div>
					</section>
                    <section id="section2" className='demonstration_stage_up display_none'>
                        <label htmlFor="demonstration_code" className='demonstration_stage_text'>ШАГ 2. ФОРМИРОВАНИЕ БЛОКА ДАННЫХ</label>  
                        <div className='test_space'>   
                            <div id="demonstration_code"className='text2'>
                                <span id="add1"></span>
                                <span id="add2"></span>
                                <span id="add3"></span>
                                <span id="add4"></span>
                                <span id="add5"></span>
                                <span id="add6"></span>
                                <span id="add7" className=''></span>
                                <span id="add8" className='text3'></span>
                                <span className='cursor_text '></span>
                            </div>
                        </div>
                        <div className='demonstration_btn_block'>
                            <button disabled={btn2} className='uk-button uk-button-default confirm-button demonstration_btn' onClick={repeatTest}>Повторить</button>
                            <button disabled={btn2} className='uk-button uk-button-default confirm-button demonstration_btn' onClick={completeSection2}>Продолжить</button>
                        </div>
                    </section>
                    <section id="section3" className='demonstration_stage_up display_none'>
                        <label htmlFor="demonstration_code" className='demonstration_stage_text'>ШАГ 3. ОБРАБОТКА ЗАПРОСА</label>  
                        <div id="demonstration_res" className='test_space'>
                            {rsult_block()}
                        </div>
                        <div className='demonstration_btn_block'>
                            <button  className='uk-button uk-button-default confirm-button demonstration_btn' onClick={repeatDemonstration}>Сначала</button>
                            <button className='uk-button uk-button-default confirm-button demonstration_btn' onClick={closeDemonstration}>Завершить</button>
                        </div>
                    </section>
				</div>
				{/* <h4 className="uk-text-bold">Что такое цифровой профиль студента?</h4>
				<p><span className="text_color3 text_weight500">Цифровой профиль студента</span> — это электронное портфолио , визуализирующее знания и компетенции, которые получает студент в результате освоения им основных и дополнительных дисциплин в процессе обучения в вузе.</p>
				<p>Наш сервис собирает цифровой след, что позваляет создавать и пополнять цифровое портфолио обучающегося, включая в него не только достижения, но и круг интересов, увлечений. </p>
				<img src={infograph} className="uk-align-center" alt="graph" />
				<p>Используя современные методы анализа больших данных, из цифрового профиля можно успешно извлечь актуальную и объективную информацию для диагностики профессиональной компетентности будущего выпускника и определить факторы, которые сказались на ее формировании. Сравнение полученных данных предоставит  студенту возможность составить резюме, чтобы в соответствии с тем, как он обучался, можно было находить целевые вакансии.</p>
				<p>Так как процесс формирования цифрового профиля предполагает сбор данных о студентах в течение всего времени обучения, то можно рассчитывать, что он также поможет студенту оценить уровень собственных знаний и навыков в различных областях обучения, своевременно понять, куда двигаться дальше, исходя из уровня сформированных компетенций, и определить, насколько он успешен в процессе усвоения знаний.</p>
				<p>Для будущего работадателя появляется возможность оценить, какие навыки получил потенциальный сотрудник за время своего обучения, в каких направлениях проявлял инициативу, какова его сфера интересов.</p>
				<p>А университету, цифровой профиль, например, позволит провести отбор студентов, имеющих значительные достижения, для поощрения их повышенной стипендией, модернизировать образовательные обучающие программы, редактировать содержание базовых курсов и включать в учебный план новые необходимые и недостающие дисциплины.</p> */}

			</div>
            {/* <p className='text3' style={{ whiteSpace: 'pre-wrap' }}>
            {"Example #2: \n new line or \u000A new line"}
            </p> */}
		</main>
	)
}


export default ServiceInfoPage;
