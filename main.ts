/**
 * このファイルを使って、独自のブロックを定義してください。
 * 詳細については、https://makecode.microbit.org/blocks/custom を参照してください。
 */

/**
 * カスタムブロック
 */
//% weight=100 color=#FFA500 icon="" block="ライントレーサー"
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
     * 指定した方向のセンサーが白を検出したかどうかを判定します。
     * センサーのアナログ値が700未満の場合に「白」と判定します。
     * @param direction 判定するセンサーの方向（右:P0, 左:P1）
     */
    //% block="%direction のセンサが白だったら"
    //% group="センサー"
    export function isWhite(direction: SensorDirection): boolean {
        const threshold = 700; // 白と判定するアナログ値のしきい値（この値は環境に応じて調整してください）
        let sensorValue = 0;

        if (direction == SensorDirection.Left) {
            // 左センサー (P1) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P1);
        } else {
            // 右センサー (P0) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P0);
        }

        // センサーの値がしきい値未満なら true (白)、そうでなければ false を返す
        return sensorValue < threshold;
    }
}