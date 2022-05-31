import {$} from '../../assets/core/dom'

export function tableResizeHendler($root, event){
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizeble"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const siteProperty = type === 'column' ? 'bottom' : 'right'
        let value

        $resizer.css({
            opacity: 1,
            zIndex: 1000,
            [siteProperty]: '-5000px'
        })

        const cells = $root.findAll(`[data-column="${$parent.data.column}"]`)

        document.onmousemove = e => {
            if (type === 'column') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'column') {
                $parent.css({width: value + 'px'})
                cells.forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }

            resolve({
                value,
                type,
                id: $parent.data[type]
            })

            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })
}

