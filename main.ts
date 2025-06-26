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

    // センサーの方向（左・右）を選択するための設定
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
        // 右のタイヤ（P13）を指定された速度で回転
        pins.analogWritePin(AnalogPin.P13, speed);
        // 左のタイヤ（P15）を指定された速度で回転
        pins.analogWritePin(AnalogPin.P15, speed);
    }

    /**
     * 指定した速さで右に曲がります。右のタイヤのみが回転し、左のタイヤは停止します。
     * @param speed 右のタイヤの回転速度 (0-1023)。例: 512
     */
    //% block="右折する 速さ %speed"
    //% speed.min=0 speed.max=1023
    //% group="モーター制御"
    export function turnRight(speed: number): void {
        // 右のタイヤ（P13）を指定された速度で回転
        pins.analogWritePin(AnalogPin.P13, speed);
        // 左のタイヤ（P15）を停止
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
        // 左のタイヤ（P15）を指定された速度で回転
        pins.analogWritePin(AnalogPin.P15, speed);
        // 右のタイヤ（P13）を停止
        pins.analogWritePin(AnalogPin.P13, 0);
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
        const threshold = 700; // 黒と判定するアナログ値のしきい値（この値は環境に応じて調整してください）
        let sensorValue = 0;

        if (direction == SensorDirection.Left) {
            // 左センサー (P1) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P1);
        } else {
            // 右センサー (P0) の値を読み取る
            sensorValue = pins.analogReadPin(AnalogPin.P0);
        }

        // センサーの値がしきい値以上なら true (黒)、そうでなければ false を返す
        return sensorValue >= threshold;
    }
}