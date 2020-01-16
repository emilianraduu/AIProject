import React from 'react'
import {AvatarSmall} from '../../../styles/shared/avatar'
import Flag from 'react-world-flags'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {LabelBox, NormalPBold, SmallP, SmallPBold} from '../../../styles/typography/typography'
import {Tag, TagWrapper} from '../../../styles/shared/tag'
import {BoxElement, BoxExpand, BoxHeader, BoxHeaderLeft, BoxHeaderRight, BoxWrapper, HeaderWithIcon} from './styles/box'

export default function Box({status, header, link, expand, avatarUrl, festival}) {
    // const [expanded, setExpanded] = useState(true)
    return (
        <BoxWrapper>
            <Link to={link && link.url}>
                <BoxHeader spaceBetween>
                    <BoxHeaderLeft>
                        {!status && <AvatarSmall url={avatarUrl}/>}
                        <HeaderWithIcon title={status && 'true'}>
                            {
                                header && header.title &&
                                <NormalPBold>
                                    {
                                        header.title.join(' ')
                                    }
                                </NormalPBold>
                            }
                            {
                                header && header.subTitle &&
                                <SmallP space={header.flag && true}>
                                    {
                                        header.flag && <><Flag
                                            code={header.flagCode} height={10}/> {header.flag}
                                        </>
                                    }
                                    {
                                        header.subTitle.join(' ')
                                    }
                                </SmallP>
                            }
                        </HeaderWithIcon>
                    </BoxHeaderLeft>
                    <BoxHeaderRight>
                        {status && <TagWrapper color={status}><Tag status={status}>{status}</Tag></TagWrapper>}
                        {festival && <SmallP>{festival}</SmallP>}
                    </BoxHeaderRight>
                </BoxHeader>
                <BoxExpand active={!_.isEmpty(expand)} noMiddleBorder={expand && _.size(expand) !== 4}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            _.map(expand, (value, key) =>
                                <BoxElement key={key} flex={expand && _.size(expand) === 4}>
                                    <LabelBox>{key}</LabelBox>
                                    <SmallPBold lowercase>{value}</SmallPBold>
                                </BoxElement>)

                        }
                    </div>
                </BoxExpand>
            </Link>
        </BoxWrapper>

    )
}
