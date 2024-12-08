import { _decorator, Component, Node, Vec3, tween, Tween, easing } from 'cc';
const { ccclass } = _decorator;

@ccclass('Button')
export class Button extends Component {
    private originalScale: Vec3 = new Vec3();
    private targetScale: Vec3 = new Vec3();
    private pulseScale: Vec3 = new Vec3();
    private clickScale: Vec3 = new Vec3();
    private activeTween: Tween | null = null;

    start() {
        this.originalScale.set(this.node.scale);
        this.targetScale.set(this.originalScale).multiplyScalar(1.1);
        this.pulseScale.set(this.originalScale).multiplyScalar(1.05);
        this.clickScale.set(this.originalScale).multiplyScalar(0.95);
        this.node.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
        this.node.on(Node.EventType.TOUCH_START, this.onMouseDown, this);
        this.node.on(Node.EventType.TOUCH_END, this.onMouseUp, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onMouseUp, this);
    }

    onMouseEnter() {
        if (this.activeTween) {
            this.activeTween.stop();
        }
        this.activeTween = tween(this.node)
            .to(1, { scale: this.targetScale }, { easing: 'sineInOut' })
            .to(1, { scale: this.pulseScale }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
    }

    onMouseLeave() {
        if (this.activeTween) {
            this.activeTween.stop();
            this.activeTween = null;
        }
        tween(this.node)
            .to(1, { scale: this.originalScale }, { easing: 'sineInOut' })
            .start();
    }

    onMouseDown() {
        if (this.activeTween) {
            this.activeTween.stop();
            this.activeTween = null;
        }
        tween(this.node)
            .to(0.3, { scale: this.clickScale }, { easing: 'sineInOut' })
            .start();
    }

    onMouseUp() {
        tween(this.node)
            .to(0.15, { scale: this.originalScale }, { easing: 'sineInOut' })
            .start();
    }

    update(deltaTime: number) {
        
    }
}