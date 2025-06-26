namespace custom {

    // ▼▼▼▼▼ 修正箇所 ▼▼▼▼▼
    // センサーの方向（左・右）を選択するための設定を、namespaceの中に移動しました。
    export enum SensorDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }
    // ▲▲▲▲▲ 修正箇所 ▲▲▲▲▲


    // ここからモーター制御のブロック
    // ===================================

    /**
     * 指定した速さで右に曲がります。右のタイヤのみが回転し、左のタイヤは停止します。
     * @param speed 右のタイヤの回転速度 (0-1023)。例: 512
     */
    //% block="右折する 速さ %speed"
    //% speed.min=0 speed.max=1023
    //% group="モーター制御"
    export function turnRight(speed: number): void {
        // 右のタイヤ（P13）を指定された速度でアナログ出力で回転させる
        pins.analogWritePin(AnalogPin.P13, speed);
        // 左のタイヤ（P15）を停止させる
        pins.analogWritePin(AnalogPin.P15, 0);
    }

    /**
     * 指定した速さで左に曲がります。左のタイヤのみが回転し、右のタイヤは停止します。
     * @param speed 左のタイヤの回転速度 (0-1023)。例: 512
     */
    //% block="左折する 速さ %speed"
    //% speed.min=0 speed.max=1023
    //% group="モーター制御"
    export function turnLeft(speed: number): void {
        // 左のタイヤ（P15）を指定された速度でアナログ出力で回転させる
        pins.analogWritePin(AnalogPin.P15, speed);
        // 右のタイヤ（P13）を停止させる
        pins.analogWritePin(AnalogPin.P13, 0);
    }


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
        const threshold = 700; // 白と判定するアナログ値のしきい値
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
