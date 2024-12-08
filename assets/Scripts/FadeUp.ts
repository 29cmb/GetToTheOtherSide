import { _decorator, Component, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FadeUp')
export class FadeUp extends Component {
    @property
    public duration: number = 1;
    @property
    public delay: number = 0;

    start() {
        const uiOpacity = this.node.getComponent(UIOpacity);
        if (uiOpacity) {
            uiOpacity.opacity = 0;
            tween(uiOpacity)
                .delay(this.delay)
                .to(this.duration, { opacity: 255 }, { easing: 'sineIn' })
                .start();
        }
    }

    update(deltaTime: number) {
        
    }
}