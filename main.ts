/**
 * このファイルを使って、独自のブロックを定義してください。
 * 詳細については、https://makecode.microbit.org/blocks/custom を参照してください。
 */

/**
 * カスタムブロック
 */
//% weight=100 color=#0fbc11 icon="" block="カスタムモーター"
//% groups=['モーター制御', 'センサー']
namespace custom {

    // タイヤの左右を選択するための設定
    export enum TireDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }

    // タイヤの動作を選択するための設定
    export enum TireAction {
        //% block="回す"
        Move,
        //% block="止める"
        Stop
    }

    // センサーの左右を選択するための設定
    export enum SensorDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }

    // ===================================
    // ここからモーター制御のブロック
    // ===================================

    /**
     * 指定した速さで直進します。左右のタイヤが同じ速度で回転します。
     * @param speed 回転速度 (0-1023)。例: 800
     */
    //% block="直進する 速さ %speed"
    //% speed.min=0 speed.max=1023
    //% group="モーター制御"
    export function goStraight(speed: number): void {
        // 右のタイヤ（P13）と左のタイヤ（P15）を指定された速度で回転
        pins.analogWritePin(AnalogPin.P13, speed);
        pins.analogWritePin(AnalogPin.P15, speed);
    }

    /**
     * 指定したタイヤを回す、または止めます。
     * @param direction 操作するタイヤ（右:P13, 左:P15）
     * @param action 行う動作（回す/止める）
     */
    //% block="%direction のタイヤを %action"
    //% group="モーター制御"
    export function controlTire(direction: TireDirection, action: TireAction): void {
        const moveSpeed = 500; // 「回す」ときの速さ。この値を変更すると速さが変わります。
        let targetPin: AnalogPin;
        let output = 0;

        // 操作するタイヤのピンを決定
        if (direction == TireDirection.Left) {
            targetPin = AnalogPin.P15;
        } else {
            targetPin = AnalogPin.P13;
        }

        // 行う動作に応じて出力を決定
        if (action == TireAction.Move) {
            output = moveSpeed;
        } else {
            output = 0;
        }

        // 決定したピンに出力を設定
        pins.analogWritePin(targetPin, output);
    }


    // ===================================
    // ここからセンサーのブロック
    // ===================================

    /**
     * 指定した方向のセンサーが黒を検出したかどうかを判定します。
     * センサーのアナログ値が700以上の場合に「黒」と判定します。
     * @param direction 判定するセンサーの方向（右:P0, 左:P1）
     */
    //% block="%direction のセンサが黒だったら"
    //% group="センサー"
    export function isBlack(direction: SensorDirection): boolean {
        const threshold = 700; // 黒と判定するアナログ値のしきい値
        let sensorValue = 0;

        if (direction == SensorDirection.Left) {
            // 左センサー (P1) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P1);
        } else {
            // 右センサー (P0) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P0);
        }

        return sensorValue >= threshold;
    }
}