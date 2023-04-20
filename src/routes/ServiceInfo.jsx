import infograph from '../imgs/info_graph.png'
const ServiceInfoPage = () => {
    
    return (
        <main>
            <div className="uk-container uk-container-large text_align_justify">
                <h4 className="uk-text-bold">Что такое цифровой профиль студента?</h4>
                <p><span className="text_color3 text_weight500">Цифровой профиль студента</span> — это электронное портфолио , визуализирующее знания и компетенции, которые получает студент в результате освоения им основных и дополнительных дисциплин в процессе обучения в вузе.</p>  
                <p>Наш сервис собирает цифровой след, что позваляет создавать и пополнять цифровое портфолио обучающегося, включая в него не только достижения, но и круг интересов, увлечений. </p>
                <img src={infograph} className="uk-align-center" alt="graph" />
                <p>Используя современные методы анализа больших данных, из цифрового профиля можно успешно извлечь актуальную и объективную информацию для диагностики профессиональной компетентности будущего выпускника и определить факторы, которые сказались на ее формировании. Сравнение полученных данных предоставит  студенту возможность составить резюме, чтобы в соответствии с тем, как он обучался, можно было находить целевые вакансии.</p>
                <p>Так как процесс формирования цифрового профиля предполагает сбор данных о студентах в течение всего времени обучения, то можно рассчитывать, что он также поможет студенту оценить уровень собственных знаний и навыков в различных областях обучения, своевременно понять, куда двигаться дальше, исходя из уровня сформированных компетенций, и определить, насколько он успешен в процессе усвоения знаний.</p>  
                <p>Для будущего работадателя появляется возможность оценить, какие навыки получил потенциальный сотрудник за время своего обучения, в каких направлениях проявлял инициативу, какова его сфера интересов.</p>
                <p>А университету, цифровой профиль, например, позволит провести отбор студентов, имеющих значительные достижения, для поощрения их повышенной стипендией, модернизировать образовательные обучающие программы, редактировать содержание базовых курсов и включать в учебный план новые необходимые и недостающие дисциплины.</p>
                
            </div>
        </main>
    )
}


export default ServiceInfoPage;