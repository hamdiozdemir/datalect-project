import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BulletinDetailBody from "../Components/bulletinComponents/BulletinDetailBody";
import useFetch from "../Components/useFetch";
import { useTranslation } from 'react-i18next';

const BulletinDetail = () => {

    const {t, i18n} = useTranslation();
    const { id } = useParams();
    const url = 'http://localhost:8000/bulletins/'
    const { data, error, isPending } = useFetch(url + id);

    return (
        <div className="main-home-container">
            {isPending && 
            <h6> {t('loading')} </h6>
            }

            {error && <h4> **** {t('error')} ****</h4>}

            {data && 
            
            <BulletinDetailBody data={data} />
            
            }

        </div>
    );
}
 
export default BulletinDetail;